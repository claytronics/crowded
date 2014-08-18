#!/usr/bin/perl

use strict;
use Data::Dumper;
use JSON;

my $verbose = 1;
my @numbers = ( 0 );
my $title; # title of question if there is one
my $points; # total points for question
my $pass; # points needed for a pass
my %output;

my $infile = $ARGV[0];
my $outfile = $ARGV[1];

open(F, "<$infile") || die("Can't open $infile");
open(G, ">$outfile") || die("Can't open $outfile");

# gather global information first
my $lineno = 0;
while (&getline) {
    /^[ \t\r\n]*$/ && next;

    if (/^title:/) {
	($title) = /^title:\s*(.*?)\s*$/;
	$output{title} = $title;
    } elsif (/^points:/) {
	($points) = /^points:\s*(.*?)\s*$/;
	$output{points} = $points;
    } elsif (/^pass:/) {
	($pass) = /^pass:\s*(.*?)\s*$/;
	$output{pass} = $pass;
    } else {
	last;
    }
}
my $text = $_;

my $specials = "\\\\(Q|short|mc|tf|long|table|headers|row|endtable|gray|vmatch)";

my @lines = ();
 
do {
    if ($text eq "") {
	$text = &getline;
    }
    $_ = $text;

    if (!/$specials/) {
	push @lines, {"text" => $_};
    } else {
	my ($pre, $action, $post) = /(.*?)($specials)(.*)/;
	# check to make sure not \\
	if ($pre =~ /\\$/) {
	    # was \\, so ignore
	    push @lines, {"text" => $pre.$action};
	    $text = $post;
	} else {
	    if ($pre ne "") {
		push @lines, {"text" => $pre};
	    }
	    # no spaces are allowed between action and arguments.
	    my (@opts);
	    @opts = &process($action, \$post);
	    $text = $post;
	    push @lines, \@opts;
	}
    }
} while (!eof(F));
$output{info} = @lines;
print Dumper(\%output);
print G to_json(\%output, {utf8 => 1, pretty => 1});
close(F);
close(G);
exit(0);

sub process {
    my ($action, $restp) = @_;
    my (@opts);

    $verbose && print "$lineno: Found: $action->$$restp\n";
    if ($action eq "\\Q") {
	@opts = &getopts("[{", $restp);
    } elsif ($action eq "\\short") {
	@opts = &getopts("[{[", $restp);
    } elsif ($action eq "\\mc") {
	@opts = &getopts("[}", $restp);
    } elsif ($action eq "\\tf") {
 	@opts = &getopts("[{{", $restp);
    } elsif ($action eq "\\long") {
	@opts = &getopts("[{[", $restp);
    } elsif ($action eq "\\table") {
	@opts = &getopts("{[", $restp);
    } elsif ($action eq "\\headers") {
	@opts = &getopts("}", $restp);
    } elsif ($action eq "\\row") {
	@opts = &getopts("}", $restp);
    } elsif ($action eq "\\endtable") {
    } elsif ($action eq "\\gray") {
    } elsif ($action eq "\\vmatch") {
    } else {
    }
    return @opts;
}

# [ -> get a [exp]
# { -> get a {exp}
# } -> get multiple {exp}

sub getopts {
    my ($specstr, $strp) = @_;
    my (@specs, @outputs);
    @outputs = ();
    @specs = split //,$specstr;
    my $str;
    $str = $$strp;

    for my $spec (@specs) {
	if ($spec eq "[") {
	    if ($str =~ /^[[][^]]+[]]/) {
		my ($arg) = $str =~ /^[[]([^]]+)[]]/;
		push @outputs, $arg;
		$str =~ s/^[[]([^]]+)[]]//;
	    } else {
		push @outputs, "";
	    }
	} elsif ($spec eq "{") {
	    my ($arg);
	    $arg = &getbrace(\$str);
	    push @outputs, $arg;
	} elsif ($spec eq "}") {
	    my ($arg);
	    $arg = &getbrace(\$str);
	    while ($arg ne "") {
		push @outputs, $arg;
		$arg = &getbrace(\$str);
	    }
	} else {
	    die("Unknown spec: $spec");
	}
    }
    return @outputs;
}

sub getbrace {
    my ($sp) = @_;
    my ($str);

    $str = $$sp;

    # first deal with escaped chars
    # - find a char that is not in string
    my ($marker, $markeropen, $markerclose);
    $marker = "Marker";
    while (index($str, $marker) != -1) {
	$marker .= "x";
    }
    $markeropen = $marker."open";
    $markerclose = $marker."close";
    $str =~ s/\\{/$markeropen/g;
    $str =~ s/\\}/$markerclose/g;
    # now get arg
    my ($arg);
    if ($str =~ /^{[^}]+}/) {
	($arg) = $str =~ /^{([^}]+)}/;
	$arg =~ s/$markeropen/\\{/g;
	$arg =~ s/$markerclose/\\}/g;
	$str =~ s/^{[^}]+}//;
    } else {
	$arg = "";
    }
    $$sp = $str;
    return $arg;
}

sub getline {
    $_ = <F>;
    $lineno++;
    return $_;
}

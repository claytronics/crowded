*Table of Contents*

{TOC:3}

# The quiz file #

This directory hols the quiz like questions that will be applied by
the system.  Each question must be in a seperate file.  The files are
a combination of our own syntax + markdown for formatting of the
question text.  The questions will be preprocessed by the system into
a json file which is what is loaded by the crowded front-end.

Our syntax:

## comments ##

lines starting with # are comments and won't be shown to the user.
The # must be in the first column!

## overall question info ##

optional information about the question:

title: the rest of the line is the title of this question.  

points: the rest of this line is the points for this question.  Must
be a decimal number.

pass: number of points needed for a pass

## sub-question specified ##

If the question is a multipart question, then each part starts in column 1 with

\Q[pts]{level}:

specifies a question that is a sub-question to level-1.  Initial level
is 1.  defaults to level 1.  If [pts] is specified, this question is
worth a total of [pts]. Otherwise it is equal to sum of fill-ins for
this sub-question.

## fill-in answer syntax ##

Fill-ins for a question come in several types: single-short fill-in,
long fill in, table, multiple choice, true-false, and matching.

### short answer ###

\short[width]{regexp-list}[pts]

short fill in generates a blank text-box with <width> characters,
defaults to 8 if not present with an answer that must match one of the
entries in regexp-list. The answer is worth {pts} if specifed,
otherwise it equals the value of the most recently specified question.

### long answer ###

\long[height]{rubric for human to grade}[pts]

generate a text area of height lines, defaults to 8 if not present.
Answer rubric must be specified.  It is worth {pts} if specified.

### tables ###

\table{num-columns}[pts]
\headers{col-1-text}{col-2-text}...{col-num-columns-text}
\row{col specifiers}
\endtable

Will generate a table with num-columns.  If \headers is specified,
then each column title is specified here.  For each \row specified til
we get to a \endtable there is a row in the table.  There must be
num-columns brace expressions.  Inside each, there is either text,
html, markdown, or a \short{regexp-list} which will generate a fill in
for the student.  A special \gray can be used to generate a box which
is grayed out.

### multiple-choice ###

\mc[pts]{choice-1}{choice-2}...

The choice that is correct should start with a '!'
### true-false ###

\tf[pts]{yes-text}{no-text}

The choice that is correct should start with a '!'

### matching ###

\vmatch

# the processed file #

A quiz file is processed by translate.pl and produces a file which can
be loaded by the front-end to render the exam question, grade it, and
report the result to the user.

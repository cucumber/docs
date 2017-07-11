---
menu:
- all
- wiki
source: https://github.com/cucumber/cucumber/wiki/Simple-Expressions/
title: Simple Expressions
---

## Ruby

| there are/is {count} cucumber(s) available         | /^there (are|is) (.+) cucumbers? available$/  |
| there are/is {count:int} cucumber(s) available     | /^there (are|is) (\d+) cucumbers? available$/ |
| there are/is {count:decimal} cucumber(s) available | /^there (are|is) (\d+\.\d+) cucumbers? available$/ |

## Standard transforms

| type name      | regexp      | type                            |
| `int`          | `\d+`       | <platform's native int type     |
| `decimal`      | `\d+\.\d+`  | <platform's native decimal type |

## Questions

- Are the standard transforms localised? e.g. Support `,` as decimal separator and `.` as thousand separator.

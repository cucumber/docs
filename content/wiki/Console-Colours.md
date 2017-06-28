+++
title = "Console Colours"
origin = "https://github.com/cucumber/cucumber/wiki/File"
menu = ["all", "wiki"]
+++

The console output for Cucumber colours steps according to how execution went. In addition to that, matched step variables are highlighted. Here is an example of how a single step gets printed:


&lt;pre&gt;&lt;span style="color:green"&gt;Given I have&lt;/span&gt; &lt;span style="color:green;font-weight:bold"&gt;487&lt;/span&gt; &lt;span style="color:green"&gt;cucumbers in my belly&lt;/span&gt; &lt;span style="color:grey"&gt;\# features/vegetable\_features.feature:49&lt;/span&gt;
&lt;/pre&gt;

You can tweak the colours by defining a <code>$CUCUMBER\_COLORS</code> variable in your shell, very much like you can tweak the colours of the familiar POSIX command <code>ls</code> with
[$LSCOLORS or $LS\_COLORS](http://mipsisrisc.com/rambling/2008/06/27/lscolorsls_colors-now-with-linux-support/).

*Don't attempt to set it in your <code>support/env.rb</code> file or any other Ruby file. It must be defined **before** Cucumber starts. You can do it in your Rakefile with* <code>ENV\['CUCUMBER\_COLORS'\] = '...'</code>

The colours that you can change are:

| Key            | Default colours                                                  |
|----------------|------------------------------------------------------------------|
| undefined      | <span style="color:yellow;">yellow</span> (v0.2.0 and up)        |
| pending        | <span style="color:yellow;">yellow</span>                        |
| pending\_param | <span style="color:yellow;font-weight: bold;">yellow,bold</span> |
| failed         | <span style="color:red;">red</span>                              |
| failed\_param  | <span style="color:red;font-weight: bold;">red,bold</span>       |
| passed         | <span style="color:green;">green</span>                          |
| passed\_param  | <span style="color:green;font-weight: bold;">green,bold</span>   |
| skipped        | <span style="color:cyan;">cyan</span>                            |
| skipped\_param | <span style="color:cyan;font-weight: bold;">cyan,bold</span>     |
| comment        | <span style="color:grey;">grey</span>                            |
| tag            | <span style="color:cyan;">cyan</span> (v0.2.0 and up)            |

For instance, if your shell has a black background and a green font (like the
"Homebrew" settings for OS X' Terminal.app), you may want to override passed
steps to be white instead of green. Examples:

    export CUCUMBER_COLORS=passed=white
    export CUCUMBER_COLORS=passed=white,bold:passed_param=white,bold,underline

Aslak likes to highlight all parameters in magenta, so he uses this:

    export CUCUMBER_COLORS=pending_param=magenta:failed_param=magenta:passed_param=magenta:skipped_param=magenta

(If you're on Windows, use <code>SET</code> instead of <code>export</code>).

To see what colours and effects are available, just run this in your shell:

    ruby -e "require 'rubygems'; require 'term/ansicolor'; puts Term::ANSIColor.attributes"

Although not listed in the output, you can also use <code>grey</code>.

Windows
-------

Windows users can get colours by installing [ANSICON](https://github.com/adoxa/ansicon/downloads) or [cmder](http://cmder.net/)

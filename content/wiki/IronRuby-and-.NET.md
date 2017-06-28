+++
title = "IronRuby and .NET"
source = "https://github.com/cucumber/cucumber/wiki/IronRuby-and-.NET/"
menu = ["all", "wiki"]
+++

**<span style="color: red;">This guide is outdated</span>**. See The most recent IronRuby articles in \[\[Tutorials and related blog posts\]\].

Developing in .NET? You can use Cucumber with IronRuby. You need both IronRuby and MRI (Matz Ruby Interpreter).

(Mono users - see \[\[IronRuby and Mono\]\])

Installing Cucumber with IronRuby 0.9.2
---------------------------------------

With the latest release of IronRuby, I believe the installation process has been simplified. The following steps appeared to work well:

    igem install cucumber --no-ri --no-rdoc
    igem install iron-term-ansicolor --no-ri --no-rdoc
    copy IronRuby\bin\iGem.bat IronRuby\bin\iCucumber.bat
    copy IronRuby\Lib\ironruby\gems\1.8\gems\cucumber-0.4.4\bin\cucumber IronRuby\bin\iCucumber

Edit that file and add the following line to it:

    require 'rubygems'

above all of the other require statements - the beginning of the file should look something like this:

    require 'rubygems'
    require 'cucumber/rspec_neuter'
    require 'cucumber/cli/main' 

Run the following command to see if everything is working properly:

    icucumber --help

Now skip down to the section that explains how to run the examples

Installing MRI
--------------

You may need MRI to build IronRuby. You also need MRI to install gems if IronRuby is not able to install some gem itself. When you have installed IronRuby you can use gems installed into MRI from IronRuby. See the [IronRuby Gems information page](http://www.ironruby.net/Documentation/Real_Ruby_Applications/RubyGems) for details.

Just download the latest Ruby One click installer from RubyForge and run it with the defaults.
When you open a new command prompt you should be able to run:

    ruby --version

and

    rake --version

If you already have MRI installed, make sure you have the latest version of RubyGems:

    SET HOME=C:\tmp
    gem update --system

Building and Installing IronRuby
--------------------------------

You can download IronRuby from "http://ironruby.codeplex.com/:"http://ironruby.codeplex.com/

Refer to [IronRuby GIT wiki](http://wiki.github.com/ironruby/ironruby) for downloading the sources and building from the sources.

Installing required gems
------------------------

You can install gems with IronRuby using the `igem.bat` script in the bin folder. See the [IronRuby Gems information page](http://www.ironruby.net/Documentation/Real_Ruby_Applications/RubyGems) for details. For now, it is safer to install the cucumber gem using MRI.

    gem install cucumber rspec

(Note: until Cucumber 0.1.12 is released you have to get the Cucumber code from Git and build the gem yourself).

Creating a Cucumber wrapper script for IronRuby
-----------------------------------------------

When Cucumber is installed, a <code>cucumber.bat</code> script is placed under your MRI's bin directory.
This script will run Cucumber with MRI. We'll make a similar one that will launch Cucumber
with IronRuby.

Create an empty file called <code>icucumber.bat</code> in MRI's bin directory.
Open it in your favourite text editor (I hope you have installed something better than
Notepad, but it will do).

On my system <code>icucumber.bat</code> looks like this (You may have to change the path to <code>ir.exe</code>).

    <code>@ECHO OFF
    REM This is to tell IronRuby where to find gems.
    SET GEM_PATH=c:\ruby\lib\ruby\gems\1.8
    @"C:\ironruby\build\debug\ir.exe" "c:\ruby\bin\cucumber" %* 
    </code>

Tip: C:\\ruby\\... is just the path to your Ruby installation, if you've chosen to install it elsewhere, change that part of the script. Also C:\\ironruby\\... is just the path to your IronRuby installation, so again, if you've chosen to install it elsewhere (like C:\\Languages\\IronRuby), you should update the script.

Now you should be able to run Cucumber with IronRuby:

    icucumber --help

Running the examples
--------------------

Open a command prompt and cd to the Cucumber examples directory. If you have installed MRI to the default
location you'll find them under <code>C:\\ruby\\lib\\ruby\\gems\\1.8\\gems\\cucumber-X.Y.Z\\examples</code>. (Replace <code>X.Y.Z</code> with the Cucumber version you installed above).

If you pulled the Cucumber code with Git, you'll find the examples under <code>examples</code>.

### Run the plain ruby example

    <code>cd i18n\en
    icucumber features
    </code>

The Code under test is pure Ruby, so it's not that interesting in the context of IronRuby.

### Run the C\# example

    <code>cd cs
    compile.bat
    icucumber features
    </code>

The code under test is C\#. Now go ahead and add some Cucumber love to your own C\# code!

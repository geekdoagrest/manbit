# PSR - Following Patterns in PHP
Few people know about PSR, it is a PHP writing standard that should be followed :)

## Basic Coding Standard
PSR was born with the goal of creating a universal development standard, created by the PHP Framework Interoperability Group is the main standard used today, so if you work with any framework or use a third party library, you have had contact with this standard and I didn't even know :) This document has many rules and several versions, it can be tricky to put into practice perfectly, but for that there are tools and validators that will help in this task, among them PHP_CodeSniffer, I will go into detail about it next time. article, for today we will focus on the pattern.

I will describe here just a summary, but you can go deeper into the link below: PHP Framework Interoperability Group

## In General
- The code MUST use 4 spaces for indentation instead of tabs.
- Each line must be 80 characters or less.
- Blank lines CAN be added for readability and to indicate related blocks of code.

## Files
- All PHP files MUST use the Unix LF linefeed.
- All PHP files MUST end with a single blank line.
- The closing tag?> MUST be omitted in files containing only PHP.
- There MUST be no white space at the end of lines.
- PHP keywords MUST be lower case.
- PHP constants true, false, and null MUST be lower case.

## Classes and Namespaces
- Files must contain only PHP code.
- Files MUST use only <? Php and <? = Tags.
- Files should only use UTF-8.
- The name of the classes must be declared in: StudlyCaps.
- The methods in: camelCase
- You need to put a blank line after namespace declarations and use.
- Opening and closing of classes and methods in classes must be on an isolated line.
- Visibility must be declared on all class methods (Public, Protected or Private).
- Class constants MUST be capitalized with underscores.
- The VAR keyword should not be used to declare a property.

```javascript
<?php  
namespace Vendor\Package;

use FooInterface;
use BarClass as Bar;
use OtherVendor\OtherPackage\BazClass;

class Foo extends Bar implements FooInterface
{
    public $foo = null;
    
    public function sampleMethod($a, $b = null)
    {
        if ($a === $b) {
            bar();
        } elseif ($a > $b) {
            $foo->bar($arg1);
        } else {
            BazClass::bar($arg2, $arg3);
        }
    }

    final public static function bar()
    {
        // method body
    }
}
```

## Control Blocks and Functions

- Control keywords (if, while, for, foreach, switch) must have a space between closing the parenthesis and opening the block.
- In the argument list, there MUST NOT be a space before each comma and there MUST be a space after each comma.
- Control blocks like if must have block opening on the same line and closing on an isolated line.

````javascript
<?php
function foo()
{
    // function body
}

if($argument1,space $argument2,space $argument3  = [])space'{
    4spaces code
}
```

Currently there is PSR-4 but it is very important to stay uptodate and always consult the official documentation in PHP-FIG :)


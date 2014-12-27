//
// use as: node test.js "your_regex_here" > output.txt

var echo = console.log;


var Composer = require('../../src/js/regexcomposer.js');

echo("Testing Composer.VERSION = " + Composer.VERSION);
echo("================");

var identifierSubRegex = Composer( )
                
                .characterGroup( )
                    .characters( '_' )
                    .range( 'a', 'z' )
                .end( )
                
                .characterGroup( )
                    .characters( '_' )
                    .range( 'a', 'z' )
                    .range( '0', '9' )
                .end( )
                
                .zeroOrMore( )
            
                .partial( );

var outregex = Composer( )
                    
                    .startOfLine( )
                    
                    .either( )
                        
                        .sub( identifierSubRegex )
                        
                        .match( '**aabb**' )
                        
                        .any( )
                        
                        .space( )
                        
                        .digit( false ).oneOrMore( )
                    
                    .end( )
                    
                    .zeroOrMore( false )
                    
                    .endOfLine( )
                    
                    .compose( 'i' );
    
echo("Partial: " + identifierSubRegex);
echo("Composed: " + outregex.toString());
echo("Expected: " + "/^([_a-z][_a-z0-9]*|\\*\\*aabb\\*\\*|.|\\s|\\D+)*?$/i");
echo("================");
echo();

var Analyzer = require('../../src/js/regexanalyzer.js'),
    anal, peekChars, sampleStr, inregex = process.argv[2] || /xyz[abc0-9]{2,3}/gmi
;

echo("Testing Analyzer.VERSION = " + Analyzer.VERSION);
echo("================");

// test it
anal = Analyzer( inregex );
peekChars = anal.getPeekChars( );
sampleStr = anal.generateSample( );

echo("Input: " + inregex.toString( ));
echo();
echo("Regular Expression: " + anal.$regex);
echo();
echo("Regular Expression Flags: ");
echo(anal.$flags);
echo();
echo("Regular Expression Parts: ");
echo(JSON.stringify(anal.$parts, null, 4));
echo();
echo("Regular Expression Peek Characters: ");
echo(JSON.stringify(peekChars, null, 4));
echo();
echo("Regular Expression Sample Match String: ");
echo(sampleStr + ' -> ' + (inregex.test(sampleStr) ? 'Matched' : 'NOT Matched'));
echo("================");
echo();

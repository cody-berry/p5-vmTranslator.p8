/**
 *  @author Cody
 *  @date 2022.03.11
 *
 *
 */

/** 🧹 shows debugging info using text() 🧹 */
function displayDebugCorner() {
    const LEFT_MARGIN = 10
    const DEBUG_Y_OFFSET = height - 10 /* floor of debug corner */
    const LINE_SPACING = 2
    const LINE_HEIGHT = textAscent() + textDescent() + LINE_SPACING
    fill(0, 0, 100, 100) /* white */
    strokeWeight(0)

    text(`frameCount: ${frameCount}`,
        LEFT_MARGIN, DEBUG_Y_OFFSET - LINE_HEIGHT)
    text(`frameRate: ${frameRate().toFixed(1)}`,
        LEFT_MARGIN, DEBUG_Y_OFFSET)
}


let font
let instructions
let files
let parser
let codewriter


function preload() {
    font = loadFont('data/consola.ttf')
    files = [
        loadStrings('FunctionCalls/FibonacciElement/Main.vm'),
        loadStrings('FunctionCalls/FibonacciElement/Sys.vm')
        ]
}


function setup() {
    let cnv = createCanvas(600, 300)
    cnv.parent('#canvas')
    colorMode(HSB, 360, 100, 100, 100)
    textFont(font, 14)

    /* initialize instruction div */
    instructions = select('#ins')
    instructions.html(`<pre>
        [1,2,3,4,5] → no function
        z → freeze sketch</pre>`)


    // a parser. we'll need it later.
    for file in files {
    parser = new Parser(file)

    // a code writer.
    codewriter = new CodeWriter()

    let init = codewriter.writeInit()
    for (let code of init) {
        console.log(code)
    }

    while (parser.hasMoreCommands()) {
        // console.log(parser.lineNumber)
        parser.advance()
        // console.log(words)
        console.log("// " + parser.currentLine)


        if (parser.commandType() === C_ARITHMETIC) {
            let arithmetic = codewriter.writeArithmetic(parser.arg1())
            if (arithmetic) {
                for (let code of arithmetic) {
                    console.log(code)
                }
            }
        }
        if (parser.commandType() === C_PUSH) {
            let push = codewriter.writePushPop('push', parser.arg1(), parser.arg2())
            if (push) {
                for (let code of push) {
                    console.log(code)
                }
            }
        }
        if (parser.commandType() === C_POP) {
            let pop = codewriter.writePushPop('pop', parser.arg1(), parser.arg2())
            if (pop) {
                for (let code of pop) {
                    console.log(code)
                }
            }
        }
        if (parser.commandType() === C_LABEL) {
            let label = codewriter.writeLabel(parser.arg1())
            if (label) {
                for (let code of label) {
                    console.log(code)
                }
            }
        }
        if (parser.commandType() === C_GOTO) {
            let goto = codewriter.writeGoto(parser.arg1())
            if (goto) {
                for (let code of goto) {
                    console.log(code)
                }
            }
        }
        if (parser.commandType() === C_IF) {
            let ifGoto = codewriter.writeIf(parser.arg1())
            if (ifGoto) {
                for (let code of ifGoto) {
                    console.log(code)
                }
            }
        }
        if (parser.commandType() === C_FUNCTION) {
            let FUNCTION = // in all caps because 'function' is a keyword
                codewriter.writeFunction(parser.arg1(), parser.arg2())
            if (FUNCTION) {
                for (let code of FUNCTION) {
                    console.log(code)
                }
            }
        }
        if (parser.commandType() === C_RETURN) {
            let RETURN = // return is a keyword as well
                codewriter.writeReturn()
            if (RETURN) {
                for (let code of RETURN) {
                    console.log(code)
                }
            }
        }
    }

    noLoop()
}


function draw() {
    background(234, 34, 24)

    displayDebugCorner()
}





function keyPressed() {
    /* stop sketch */
    if (key === 'z') {
        noLoop()
        instructions.html(`<pre>
            sketch stopped</pre>`)
    }
}
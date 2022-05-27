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
let codeWriter

let fileStrings


function preload() {
    font = loadFont('data/consola.ttf')
    files = [
        './FunctionCalls/NestedCall/Sys.vm'
        ]
    fileStrings = []

    for (let file of files) {
        loadStrings(file, loadFileIn)
    }
}

// callback to loading a file in the list of files
function loadFileIn(fileString) {
    for (let line of fileString) {
        fileStrings.push(line)
    }
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

    // a code writer.
    codeWriter = new CodeWriter()


    // a parser. we'll need it later.

    parser = new Parser(fileStrings)
    // let init = codeWriter.writeInit()
    // for (let code of init) {
    //     console.log(code)
    // }
    while (parser.hasMoreCommands()) {
        // console.log(parser.lineNumber)
        parser.advance()
        // console.log(words)
        // console.log("// " + parser.currentLine)
        if (parser.commandType() === C_ARITHMETIC) {
            let arithmetic = codeWriter.writeArithmetic(parser.arg1())
            if (arithmetic) {
                for (let code of arithmetic) {
                    console.log(code)
                }
            }
        }
        if (parser.commandType() === C_PUSH) {
            let push = codeWriter.writePushPop('push', parser.arg1(), parser.arg2())
            if (push) {
                for (let code of push) {
                    console.log(code)
                }
            }
        }
        if (parser.commandType() === C_POP) {
            let pop = codeWriter.writePushPop('pop', parser.arg1(), parser.arg2())
            if (pop) {
                for (let code of pop) {
                    console.log(code)
                }
            }
        }
        if (parser.commandType() === C_LABEL) {
            let label = codeWriter.writeLabel(parser.arg1())
            if (label) {
                for (let code of label) {
                    console.log(code)
                }
            }
        }
        if (parser.commandType() === C_GOTO) {
            let goto = codeWriter.writeGoto(parser.arg1())
            if (goto) {
                for (let code of goto) {
                    console.log(code)
                }
            }
        }
        if (parser.commandType() === C_IF) {
            let ifGoto = codeWriter.writeIf(parser.arg1())
            if (ifGoto) {
                for (let code of ifGoto) {
                    console.log(code)
                }
            }
        }
        if (parser.commandType() === C_FUNCTION) {
            let FUNCTION = // in all caps because 'function' is a keyword
                codeWriter.writeFunction(parser.arg1(), parser.arg2())
            if (FUNCTION) {
                for (let code of FUNCTION) {
                    console.log(code)
                }
            }
        }
        if (parser.commandType() === C_RETURN) {
            let RETURN = // return is a keyword as well
                codeWriter.writeReturn()
            if (RETURN) {
                for (let code of RETURN) {
                    console.log(code)
                }
            }
        }
        if (parser.commandType() === C_CALL) {
            let call = codeWriter.writeCall(parser.arg1(), parser.arg2())
            if (call) {
                for (let code of call) {
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
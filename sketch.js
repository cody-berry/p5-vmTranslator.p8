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
let file
let parser
let codewriter


function preload() {
    font = loadFont('data/consola.ttf')
    file = loadStrings('MemoryAccess/StaticTest/StaticTest.vm')
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
    parser = new Parser(file)

    // a code writer.
    codewriter = new CodeWriter()


    while (parser.hasMoreCommands()) {
        // console.log(parser.lineNumber)
        parser.advance()
        // console.log(words)
        console.log("// " + parser.currentLine)


        if (parser.commandType() === C_ARITHMETIC) {
            let arithmetic = codewriter.writeArithmetic(parser.arg1())
            for (let code of arithmetic) {
                console.log(code)
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
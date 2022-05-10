
let C_ARITHMETIC = Symbol('C_ARITHMETIC')
let C_PUSH = Symbol('C_PUSH')
let C_POP = Symbol('C_POP')
let C_LABEL = Symbol('C_LABEL')
let C_GOTO = Symbol('C_GOTO')
let C_IF = Symbol('C_IF')
let C_FUNCTION = Symbol('C_FUNCTION')
let C_RETURN = Symbol('C_RETURN')
let C_CALL = Symbol('C_CALL')

// this parser reads a VM command and parses the command into its
// components. It ignores all whitespace and comments.
class Parser {
    constructor(fileStrings) {
        this.file = fileStrings
        this.lineNumber = 0
        this.currentLine = ' '
    }


    // does our parser have any more commands to parse?
    hasMoreCommands() {
        if (this.lineNumber === 'start') {
            return true
        }
        return this.lineNumber < this.file.length - 1
    }


    // let's advance our line!
    advance() {
        if (this.hasMoreCommands()) {
            this.lineNumber++
            this.currentLine = trim(this.file[this.lineNumber])

            // only accept the command if it isn't whitespace.
            if (this.currentLine.length === 0) {
                this.advance()
            } else {
                let comment = this.currentLine.indexOf('//')
                if (comment !== -1) {
                    this.currentLine = trim(this.currentLine.substring(0, comment))
                }
                if (this.currentLine.length === 0) {
                    this.advance()
                }
            }
        } else {
            noLoop()
        }
    }


    // what type of command is this?
    commandType() {
        let splitCommand = this.currentLine.split(' ')
        let firstWord = splitCommand[0]

        if (firstWord === 'push') {
            return C_PUSH
        } if (firstWord === 'pop') {
            return C_POP
        } if (firstWord === 'label') {
            return C_LABEL
        } if (firstWord === 'goto') {
            return C_GOTO
        } if (firstWord === 'if-goto') {
            return C_IF
        } if (firstWord === 'function') {
            return C_FUNCTION
        } if (firstWord === 'return') {
            return C_RETURN
        } if (firstWord === 'call') {
            return C_CALL
        } else {
            return C_ARITHMETIC
        }
    }


    // what is the first argument?
    arg1() {
        if (this.commandType() === C_ARITHMETIC) {
            return this.currentLine
        } else {
            return this.currentLine.split(' ')[1]
        }
    }


    // now the second?
    arg2() {
        return int(this.currentLine.split(' ')[2])
    }
}




// writes the code for certain instructions
class CodeWriter {
    // all we need to do is to write commands!
    constructor(filename) {
        // we're going to use labels for lt, eq, and gt, but they are the same
        // name, so we need
        // a counter.
        this.labelNumber = 0

        // this will be our static segment beginning.
        this.filename = filename

        // there are multiple return addresses, so we'll have to keep count
        // of what number return address this is.
        this.returnAddressLabelNumber = 0
    }


    // write an arithmetic command
    writeArithmetic(command) {
        // writes add commands. takes the last two stack positions using
        // StackPointer and adds them.
        if (command === 'add') {
            return ["@SP", "AM=M-1", "D=M", "A=A-1", "D=D+M", "M=D"]
        }
        // does the same except it subtracts
        if (command === 'sub') {
            return ["@SP", "AM=M-1", "D=M", "A=A-1", "D=M-D", "M=D"]
        }
        // translates less/greater than or equal to commands
        if (command === 'lt') {
            this.labelNumber++
            return ["@SP", "AM=M-1", "D=M", "A=A-1", "D=D-M",
                "@TRUE" + this.labelNumber, "D;JGT",
                "@SP", "A=M-1", "M=0", "@STOP" + this.labelNumber,
                "0;JMP", "(TRUE" + this.labelNumber + ")", "@SP", "A=M-1", "M=-1",
                "(STOP" + this.labelNumber + ")"]
        } if (command === 'gt') {
            this.labelNumber++
            return ["@SP", "AM=M-1", "D=M", "A=A-1", "D=D-M",
                "@TRUE" + this.labelNumber, "D;JLT",
                "@SP", "A=M-1", "M=0", "@STOP" + this.labelNumber,
                "0;JMP", "(TRUE" + this.labelNumber + ")", "@SP", "A=M-1", "M=-1",
                "(STOP" + this.labelNumber + ")"]
        } if (command === 'eq') {
            this.labelNumber++
            return ["@SP", "AM=M-1", "D=M", "A=A-1", "D=D-M",
                "@TRUE" + this.labelNumber, "D;JEQ",
                "@SP", "A=M-1", "M=0", "@STOP" + this.labelNumber,
                "0;JMP", "(TRUE" + this.labelNumber + ")", "@SP", "A=M-1", "M=-1",
                "(STOP" + this.labelNumber + ")"]
        }
        // translates 'and' commands
        if (command === 'and') {
            return ["@SP", "AM=M-1", "D=M", "A=A-1", "M=D&M"]
        }
        // translates 'or' commands
        if (command === 'or') {
            return ["@SP", "AM=M-1", "D=M", "A=A-1", "M=D|M"]
        }
        // translates 'not' commands
        if (command === 'not') {
            this.labelNumber++
            return ["@SP", "A=M-1", "M=!M"]
        }
        // translates 'neg' commands
        if (command === 'neg') {
            return ['@SP', 'A=M-1', 'M=-M']
        }
    }


    // write a push or pop command
    writePushPop(pushOrPop, segment, index) {
        let result;
        // write a push command
        if (pushOrPop === 'push') {
            if (segment === 'constant') { // push constant i
                result = ["@" + index, "D=A"] // D=i
            } if (segment === 'local') { // push local i
                result = ["@" + index, "D=A", "@LCL", "A=D+M", "D=M"] // D=RAM[LCL+i]
            } if (segment === 'argument') { // push argument i
                result = ["@" + index, "D=A", "@ARG", "A=D+M", "D=M"] // D=RAM[ARG+i]
            } if (segment === 'this') { // push this i
                result = ["@" + index, "D=A", "@THIS", "A=D+M", "D=M"] // D=RAM[THIS+i]
            } if (segment === 'that') { // push that i
                result = ["@" + index, "D=A", "@THAT", "A=D+M", "D=M"] // D=RAM[THAT+i]
            } if (segment === 'pointer') { // push pointer i
                result = ["@" + (3+index), "D=M"] // D=THIS/THAT
            } if (segment === 'temp') { // push temp i
                result = ["@" + (5+index), "D=M"] // D=RAM[5+i]
            } if (segment === 'static') { // push static i
                result = ["@" + index + this.filename, "D=M"] // D={variable at
                // static i}
            }
            result.push("@SP")
            result.push("M=M+1")
            result.push("A=M-1")
            result.push("M=D")
        }
        if (pushOrPop === 'pop') {
            result = []
            if (segment === 'local') { // pop local i
                result.push("@" + index, "D=A", "@LCL", "D=D+M", "@ad", "M=D", "@SP", "AM=M-1", "D=M", "@ad", "A=M", "M=D") // RAM[LCL+i]=D
            } if (segment === 'argument') { // pop argument i
                result.push("@" + index, "D=A", "@ARG", "D=D+M", "@ad", "M=D", "@SP", "AM=M-1", "D=M", "@ad", "A=M", "M=D") // RAM[ARG+i]=D
            } if (segment === 'this') { // pop this i
                result.push("@" + index, "D=A", "@THIS", "D=D+M", "@ad", "M=D", "@SP", "AM=M-1", "D=M", "@ad", "A=M", "M=D") // RAM[THIS+i]=D
            } if (segment === 'that') { // pop that i
                result.push("@" + index, "D=A", "@THAT", "D=D+M", "@ad", "M=D", "@SP", "AM=M-1", "D=M", "@ad", "A=M", "M=D") // RAM[THAT+i]=D
            } if (segment === 'pointer') { // pop pointer i
                result.push("@SP", "AM=M-1", "D=M", "@" + (3+index), "M=D") // THIS/THAT=D
            } if (segment === 'temp') { // pop temp i
                result.push("@SP", "AM=M-1", "D=M", "@" + (5+index), "M=D") // RAM[5+i]=D
            } if (segment === 'static') { // pop static i
                result.push("@SP", "AM=M-1", "D=M", "@" + index + this.filename, "M=D") // {variable at
                // static
                // i} = D
            }
        }
        return result
    }

    // writes the initialization, setting SP to 256
    writeInit() {
        return [
                "// initialization code",
                "@256",
                "D=A",
                "@SP",
                "M=D"]
    }

    // writes label
    writeLabel(label) {
        return ["(" + label + ")"]
    }

    // writes goto
    writeGoto(label) {
        return ["@" + label,
                "0;JMP"]
    }

    // writes if-goto
    writeIf(label) {
        return ["@SP",
                "AM=M-1",
                "D=M",
                "@" + label,
                "D;JNE"]
    }

    // writes function
    writeFunction(functionName, numVars) {
        // this could be written as:
        // label {functionName}
        // push 0 {numVars} times
        let result = ["("+ functionName + ")", "@5", "D=A", "@SP", "M=M+D"]
        for (let i = 0; i < numVars; i++) {
            result.push("@SP", "M=M+1", "A=M-1", "M=0")
        }
        return result
    }

    // writes return
    writeReturn() {
        return ["@LCL",
                "D=M",
                "@endFrame",
                "M=D",         // endFrame = LCL
                "@SP",
                "AM=M-1",
                "D=M",
                "@ARG",
                "A=M",
                "M=D",         // pop arg 0
                "@ARG",
                "D=M+1",
                "@SP",
                "M=D",         // SP = ARG + 1
                "@endFrame",
                "AM=M-1",
                "D=M",
                "@THAT",
                "M=D",         // endFrame--, THAT=*endFrame
                "@endFrame",
                "AM=M-1",
                "D=M",
                "@THIS",
                "M=D",         // endFrame--, THIS=*endFrame
                "@endFrame",
                "AM=M-1",
                "D=M",
                "@ARG",
                "M=D",         // endFrame--, ARG=*endFrame
                "@endFrame",
                "AM=M-1",
                "D=M",
                "@LCL",
                "M=D",         // endFrame--, LCL=*endFrame
                "@endFrame",
                "AM=M-1",
                "A=M",
                "0;JMP"        // endFrame--, goto *endFrame
            ]
    }

    // changes the filename
    changeFile(filename) {
        this.filename = filename
    }

    // writes call
    writeCall(functionName, numArgs) {
        this.returnAddressLabelNumber++

        return [
            "// call",
            "@" + max(1-numArgs, 0),
            "D=A",
            "@SP",
            "M=D+M",
            "@returnAddress" + this.returnAddressLabelNumber,
            "D=A",
            "@SP",
            "A=M",
            "M=D",
            "@LCL",
            "D=M",
            "@SP",
            "AM=M+1",
            "M=D",
            "@ARG",
            "D=M",
            "@SP",
            "AM=M+1",
            "M=D",
            "@THIS",
            "D=M",
            "@SP",
            "AM=M+1",
            "M=D",
            "@THAT",
            "D=M",
            "@SP",
            "AM=M+1",
            "M=D",
            "@SP",
            "MD=M+1",
            "@5",
            "D=D-A",
            "@" + max(numArgs, 1),
            "D=D-A",
            "@ARG",
            "M=D",
            "@SP",
            "D=M",
            "@LCL",
            "M=D",
            "@" + functionName,
            "0;JMP",
            "(returnAddress" + this.returnAddressLabelNumber + ")"
        ]
    }
}


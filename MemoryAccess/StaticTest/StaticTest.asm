// push constant 111
@111
D=A
@SP
M=M+1
A=M-1
M=D
// push constant 333
@333
D=A
@SP
M=M+1
A=M-1
M=D
// push constant 888
@888
D=A
@SP
M=M+1
A=M-1
M=D
// pop static 8
@SP
AM=M-1
D=M
@8A
M=D
// pop static 3
@SP
AM=M-1
D=M
@3A
M=D
// pop static 1
@SP
AM=M-1
D=M
@1A
M=D
// push static 3
@3A
D=M
@SP
M=M+1
A=M-1
M=D
// push static 1
@1A
D=M
@SP
M=M+1
A=M-1
M=D
// sub
@SP
AM=M-1
D=M
A=A-1
D=M-D
M=D
// push static 8
@8A
D=M
@SP
M=M+1
A=M-1
M=D
// add
@SP
AM=M-1
D=M
A=A-1
D=D+M
M=D
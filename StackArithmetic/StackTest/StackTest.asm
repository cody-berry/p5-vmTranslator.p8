// push constant 17
@17
D=A
@0
M=M+1
A=M-1
M=D
// push constant 17
@17
D=A
@0
M=M+1
A=M-1
M=D
// eq
@0
AM=M-1
D=M
A=A-1
D=D-M
@TRUE1
D;JEQ
@0
A=M-1
M=0
@STOP1
0;JMP
(TRUE1)
@0
A=M-1
M=-1
(STOP1)
// push constant 17
@17
D=A
@0
M=M+1
A=M-1
M=D
// push constant 16
@16
D=A
@0
M=M+1
A=M-1
M=D
// eq
@0
AM=M-1
D=M
A=A-1
D=D-M
@TRUE2
D;JEQ
@0
A=M-1
M=0
@STOP2
0;JMP
(TRUE2)
@0
A=M-1
M=-1
(STOP2)
// push constant 16
@16
D=A
@0
M=M+1
A=M-1
M=D
// push constant 17
@17
D=A
@0
M=M+1
A=M-1
M=D
// eq
@0
AM=M-1
D=M
A=A-1
D=D-M
@TRUE3
D;JEQ
@0
A=M-1
M=0
@STOP3
0;JMP
(TRUE3)
@0
A=M-1
M=-1
(STOP3)
// push constant 892
@892
D=A
@0
M=M+1
A=M-1
M=D
// push constant 891
@891
D=A
@0
M=M+1
A=M-1
M=D
// lt
@0
AM=M-1
D=M
A=A-1
D=D-M
@TRUE4
D;JGT
@0
A=M-1
M=0
@STOP4
0;JMP
(TRUE4)
@0
A=M-1
M=-1
(STOP4)
// push constant 891
@891
D=A
@0
M=M+1
A=M-1
M=D
// push constant 892
@892
D=A
@0
M=M+1
A=M-1
M=D
// lt
@0
AM=M-1
D=M
A=A-1
D=D-M
@TRUE5
D;JGT
@0
A=M-1
M=0
@STOP5
0;JMP
(TRUE5)
@0
A=M-1
M=-1
(STOP5)
// push constant 891
@891
D=A
@0
M=M+1
A=M-1
M=D
// push constant 891
@891
D=A
@0
M=M+1
A=M-1
M=D
// lt
@0
AM=M-1
D=M
A=A-1
D=D-M
@TRUE6
D;JGT
@0
A=M-1
M=0
@STOP6
0;JMP
(TRUE6)
@0
A=M-1
M=-1
(STOP6)
// push constant 32767
@32767
D=A
@0
M=M+1
A=M-1
M=D
// push constant 32766
@32766
D=A
@0
M=M+1
A=M-1
M=D
// gt
@0
AM=M-1
D=M
A=A-1
D=D-M
@TRUE7
D;JLT
@0
A=M-1
M=0
@STOP7
0;JMP
(TRUE7)
@0
A=M-1
M=-1
(STOP7)
// push constant 32766
@32766
D=A
@0
M=M+1
A=M-1
M=D
// push constant 32767
@32767
D=A
@0
M=M+1
A=M-1
M=D
// gt
@0
AM=M-1
D=M
A=A-1
D=D-M
@TRUE8
D;JLT
@0
A=M-1
M=0
@STOP8
0;JMP
(TRUE8)
@0
A=M-1
M=-1
(STOP8)
// push constant 32766
@32766
D=A
@0
M=M+1
A=M-1
M=D
// push constant 32766
@32766
D=A
@0
M=M+1
A=M-1
M=D
// gt
@0
AM=M-1
D=M
A=A-1
D=D-M
@TRUE9
D;JLT
@0
A=M-1
M=0
@STOP9
0;JMP
(TRUE9)
@0
A=M-1
M=-1
(STOP9)
// push constant 57
@57
D=A
@0
M=M+1
A=M-1
M=D
// push constant 31
@31
D=A
@0
M=M+1
A=M-1
M=D
// push constant 53
@53
D=A
@0
M=M+1
A=M-1
M=D
// add
@0
AM=M-1
D=M
A=A-1
D=D+M
M=D
// push constant 112
@112
D=A
@0
M=M+1
A=M-1
M=D
// sub
@0
AM=M-1
D=M
A=A-1
D=M-D
M=D
// neg
@0
A=M-1
M=-M
// and
@0
AM=M-1
D=M
A=A-1
M=D&M
// push constant 82
@82
D=A
@0
M=M+1
A=M-1
M=D
// or
@0
AM=M-1
D=M
A=A-1
M=D|M
// not
@0
A=M-1
M=!M
 (Sys.init)
@4000
D=A
@SP
M=M+1
A=M-1
M=D
 @SP
 AM=M-1
 D=M
 @3
 M=D
@5000
D=A
@SP
M=M+1
A=M-1
M=D
 @SP
 AM=M-1
 D=M
 @4
 M=D
 // call
 @returnAddress1
 D=A
 @SP
 AM=M+1
 M=D
 @LCL
 D=M
 @SP
 AM=M+1
 M=D
 @ARG
 D=M
 @SP
 AM=M+1
 M=D
 @THIS
 D=M
 @SP
 AM=M+1
 M=D
 @THAT
 D=M
 @SP
 AM=M+1
 M=D
 @SP
 MD=M+1
 @5
 D=D-A
 @0
 D=D-A
 @ARG
 M=D
 @SP
 D=M
 @LCL
 M=D
 @Sys.main
 0;JMP
 (returnAddress1)
 @SP
 AM=M-1
 D=M
 @6
 M=D
 (LOOP)
 @LOOP
 0;JMP
 (Sys.main)
 @SP
 M=M+1
 A=M-1
 M=0
 @SP
 M=M+1
 A=M-1
 M=0
 @SP
 M=M+1
 A=M-1
 M=0
 @SP
 M=M+1
 A=M-1
 M=0
 @SP
 M=M+1
 A=M-1
 M=0
@4001
D=A
@SP
M=M+1
A=M-1
M=D
 @SP
 AM=M-1
 D=M
 @3
 M=D
@5001
D=A
@SP
M=M+1
A=M-1
M=D
 @SP
 AM=M-1
 D=M
 @4
 M=D
@200
D=A
@SP
M=M+1
A=M-1
M=D
 @1
 D=A
 @LCL
 D=D+M
 @ad
 M=D
 @SP
 AM=M-1
 D=M
 @ad
 A=M
 M=D
@40
D=A
@SP
M=M+1
A=M-1
M=D
 @2
 D=A
 @LCL
 D=D+M
 @ad
 M=D
 @SP
 AM=M-1
 D=M
 @ad
 A=M
 M=D
@6
D=A
@SP
M=M+1
A=M-1
M=D
 @3
 D=A
 @LCL
 D=D+M
 @ad
 M=D
 @SP
 AM=M-1
 D=M
 @ad
 A=M
 M=D
@123
D=A
@SP
M=M+1
A=M-1
M=D
 // call
 @returnAddress2
 D=A
 @SP
 AM=M+1
 M=D
 @LCL
 D=M
 @SP
 AM=M+1
 M=D
 @ARG
 D=M
 @SP
 AM=M+1
 M=D
 @THIS
 D=M
 @SP
 AM=M+1
 M=D
 @THAT
 D=M
 @SP
 AM=M+1
 M=D
 @SP
 MD=M+1
 @5
 D=D-A
 @1
 D=D-A
 @ARG
 M=D
 @SP
 D=M
 @LCL
 M=D
 @Sys.add12
 0;JMP
 (returnAddress2)
 @SP
 AM=M-1
 D=M
 @5
 M=D
@0
D=A
@LCL
A=D+M
D=M
@SP
M=M+1
A=M-1
M=D
@1
D=A
@LCL
A=D+M
D=M
@SP
M=M+1
A=M-1
M=D
@2
D=A
@LCL
A=D+M
D=M
@SP
M=M+1
A=M-1
M=D
@3
D=A
@LCL
A=D+M
D=M
@SP
M=M+1
A=M-1
M=D
@4
D=A
@LCL
A=D+M
D=M
@SP
M=M+1
A=M-1
M=D
@SP
AM=M-1
D=M
A=A-1
D=D+M
M=D
@SP
AM=M-1
D=M
A=A-1
D=D+M
M=D
@SP
AM=M-1
D=M
A=A-1
D=D+M
M=D
@SP
AM=M-1
D=M
A=A-1
D=D+M
M=D
 @LCL
 D=M
 @endFrame
 M=D
 @SP
 AM=M-1
 D=M
 @ARG
 A=M
 M=D
 @ARG
 D=M+1
 @SP
 M=D
 @endFrame
 AM=M-1
 D=M
 @THAT
 M=D
 @endFrame
 AM=M-1
 D=M
 @THIS
 M=D
 @endFrame
 AM=M-1
 D=M
 @ARG
 M=D
 @endFrame
 AM=M-1
 D=M
 @LCL
 M=D
 @endFrame
 AM=M-1
 0;JMP
 (Sys.add12)
@4002
D=A
@SP
M=M+1
A=M-1
M=D
 @SP
 AM=M-1
 D=M
 @3
 M=D
@5002
D=A
@SP
M=M+1
A=M-1
M=D
 @SP
 AM=M-1
 D=M
 @4
 M=D
@0
D=A
@ARG
A=D+M
D=M
@SP
M=M+1
A=M-1
M=D
@12
D=A
@SP
M=M+1
A=M-1
M=D
@SP
AM=M-1
D=M
A=A-1
D=D+M
M=D
 @LCL
 D=M
 @endFrame
 M=D
 @SP
 AM=M-1
 D=M
 @ARG
 A=M
 M=D
 @ARG
 D=M+1
 @SP
 M=D
 @endFrame
 AM=M-1
 D=M
 @THAT
 M=D
 @endFrame
 AM=M-1
 D=M
 @THIS
 M=D
 @endFrame
 AM=M-1
 D=M
 @ARG
 M=D
 @endFrame
 AM=M-1
 D=M
 @LCL
 M=D
 @endFrame
 AM=M-1
 0;JMP
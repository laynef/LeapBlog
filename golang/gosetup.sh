CURRENT_DIRECTORY=$PWD
export GOPATH=$CURRENT_DIRECTORY
mkdir -p src/github.com/nf/hello
rm src/github.com/nf/hello/hello.go
echo '''package main

import "fmt"

func main() {
    fmt.Println("Meet the Fockers")
}
''' >> src/github.com/nf/hello/hello.go
cd src/github.com/nf/hello/
go install
export PATH=$CURRENT_DIRECTORY/bin/:$PATH
hello

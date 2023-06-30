module github.com/test2

go 1.20

replace github.com/aaa => ./aaa

replace github.com/bbb => ./bbb

require github.com/bbb v1.0.0

require github.com/aaa v0.0.0-00010101000000-000000000000 // indirect

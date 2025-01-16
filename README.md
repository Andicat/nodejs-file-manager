NodeJS basics.
NodeJS common modules.

https://stackblitz.com/~/github.com/Andicat/nodejs-basics

Task 1

Create.js
Implement a function that creates a new file fresh.txt with the content "I am fresh and young" inside the files folder.
If the file already exists, throw an error with the message: FS operation failed.

Copy.js
Implement a function that copies the files folder with all its content into a folder named files_copy at the same level.
If the files folder doesn't exist or the files_copy folder already exists, throw an error with the message: FS operation failed.

Rename.js
Implement a function that renames the file wrongFilename.txt to properFilename.md.
If the file wrongFilename.txt doesn't exist or properFilename.md already exists, throw an error with the message: FS operation failed.

Delete.js
Implement a function that deletes the file fileToRemove.txt.
If the file fileToRemove.txt doesn't exist, throw an error with the message: FS operation failed.

List.js
Implement a function that prints an array of all filenames from the files folder to the console.
If the files folder doesn't exist, throw an error with the message: FS operation failed.

Read.js
Implement a function that prints the content of the file fileToRead.txt to the console.
If the file fileToRead.txt doesn't exist, throw an error with the message: FS operation failed.

CalcHash.js
Implement a function that calculates the SHA256 hash for the file fileToCalculateHashFor.txt and logs it to the console as a hexadecimal value using the Streams API.

Compress.js
Implement a function that compresses the file fileToCompress.txt into archive.gz using zlib and the Streams API.

Decompress.js
Implement a function that decompresses archive.gz back into fileToCompress.txt with the same content as before compression using zlib and the Streams API.

Task 2 (optional)
Think a bit about file structure. Don't put them all in one directory.

Task 3
Create npm sripts to run demo of all commands. 

Task 4 (optional)
Run your scripts in windows and linux enviromnments.

Task 5
Link your project with https://stackblitz.com/ for testing. 
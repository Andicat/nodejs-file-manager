File manager

https://stackblitz.com/~/github.com/Andicat/nodejs-file-manager

1. File manager CLI basic functional requirements
The file manager should be able to do the following:

Work using CLI
Read and save user configuration to the .config file in the root project directory
Perform basic file operations:
Copy
Move
Delete
Rename
Utilize the Streams API
Get information about the host machine operating system
Perform hash calculations
Compress and decompress files
Run the application using:

npm run start -- --username=your_username
Application Behavior
After starting the program, it displays the following text in the console:
Welcome to the File Manager, Username! (Where Username is the value passed as the --username CLI argument.)

After the program finishes (when CTRL + C is pressed or .exit command is entered), it displays:
Thank you for using File Manager, Username, goodbye!

At startup and after each operation or input, the current working directory is printed in the following format:
You are currently in path_to_working_directory

The initial working directory is the current user's home directory. For example, on Windows, it might be system_drive/Users/Username.
Command Prompt Behavior
By default, the program prompts users to enter commands and waits for input.
On receiving an invalid input or unknown operation, it displays:
Invalid input

and allows the user to enter a new command.

If an error occurs during operation (e.g., attempting to operate on a non-existent file), it displays:
Operation failed

and allows for a new command to be entered.

Users cannot navigate above the root directory (e.g., on Windows, the root is the local drive root). If attempted, the working directory remains unchanged.

2. List of operations:

Navigation & Working Directory (NWD):
- up - move up one directory level (no effect at the root directory);
- cd path_to_directory - navigate to a specified folder (relative or absolute path);
- ls - list all files and folders in the current directory(names of files (with extensions) and folders, folders listed before files, sorted alphabetically, explicit marking of file/folder type as a column value);

Basic File Operations:
- cat path_to_file - read and display file content (uses Readable stream);
- add new_file_name - ceate an empty file;
- rn path_to_file new_filename - rename a file (content remains unchanged);
- cp path_to_file path_to_new_directory - copy a file (uses Readable and Writable streams);

Operating System Information:
- os --EOL - get End-Of-Line (EOL) character;
- os --cpus - get CPU information (model and clock rate of each CPU, and total count);
- os --homedir - print the home directory;
- os --username - get the current system username (distinct from the username set at app startup);
- os --architecture - get CPU architecture;

Hash Calculation:
- hash path_to_file - calculate and print the hash of a file;
 
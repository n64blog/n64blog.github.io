# N64 Gamepage Automation

Can be used to automatically create gamepages based on spreadsheet in Google Drive.

## Set-up

 - Install [Node.js]()
 - Open command-line console in this folder (`./build-pages`).
 - Run `npm install` to get required Handlebars package.

## Usage

Before following these steps, ensure your repository is up to date with the remote.

 - In command-line console in this folder (`./build-pages`), run `node create-md-files`.
 - Commit files you are ready to see go live. Standard Git commands should enable all of this:
 	- Use `git status` to check which files.
	- Use `git diff` or `git --word-diff` to see what's changed specifically. (Follow this command with the filename to see only changes for that page.)
	- Use `git add` followed by filename to add the pages you want to commit.
	- Use `git commit` to commit the change. (Record what the change is in the message.)
	- Use `git push origin master` to push the changes live.

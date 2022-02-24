# Github tutorial

## Repository
-----
```bash
git init # initialize a repository in current directory.
git add filename # add chosen file or files to repository, "." means all files and directories in current directory.
```

## Commit
-----
```bash
git commit -m "new_commit" # add commits before push.
```

## Push
-----
```bash
git push <url> <branch>
```

## branch
-----
```bash
git branch # list all branches.
git branch -c my_new_branch # create a new branch named "my_new_branch" .
git checkout branch_name # switch default branch.
```

## pull
-----
```bash
git pull <url> # fetch from and integrate with another repository or a local branch.
```

## reset
-----
```bash
git reset # reset current HEAD to the specified state.
```

## checkout
-----
```bash
git checkout # switch branches or restore working tree files.
```

## fetch 
-----
```bash
git fetch # Download objects and refs from another repository.
```

## [Screen](https://linuxize.com/post/how-to-use-linux-screen/)
-----
```bash
# install in CentOS
yum -y install screen
# install in Ubuntu
apt get iy screen
# create a screen task
screen
# create a named screen task
screen -S Name
# exit current task 
exit 
# list all screen task
screen -ls
# attack a screen task
screen -r ID
# detacted current screen task
Ctrl + A + D 
```
## Safari CROS Issue
solution: safari > Development > disable-cross-Origin Restriction
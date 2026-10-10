@echo on
rd /s /q node_modules
del package-lock.json
call npm cache clean --force
call npm install
call npx cypress verify

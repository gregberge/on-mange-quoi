CHECK=\033[32m✔\033[39m
HR=\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#


#
# Install website
#

install:
	@echo "\n${HR}"
	@echo "Installing website..."
	@echo "${HR}\n"
	@git clean -dxf
	@echo "Cleaning project...                   ${CHECK} Done"
	@npm install
	@echo "Install dependencies...               ${CHECK} Done"
	@grunt
	@echo "Building project...                   ${CHECK} Done"

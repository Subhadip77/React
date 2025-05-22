Overview
This React-based application generates random, secure passwords based on user preferences. It lets users:

Select password length (5 to 30 characters)
Include or exclude:
Uppercase letters (A-Z)
Lowercase letters (a-z)
Digits (0-9)
Special characters (!@#$ etc.)
Check password strength in real-time
Copy the generated password to the clipboard

Features & Why They Matter
Feature	Purpose
Adjustable password length	-> Enhances flexibility & security needs
Character toggles	-> Gives user control over password composition
Strength label	-> Provides visual feedback on password security
Copy to clipboard	-> Quick and easy use of the generated password
Range + / - buttons	-> Improve UX for adjusting password length

Password Generation function

Combines only selected character sets into str
Loops through based on length, picks random character using Math.random
Appends to pass, then sets the result via setPassword(pass)

Password Strength Checker function

Uses .test() from RegEx to check the presence of:
    Uppercase letters
    Numbers
    Special characters
Each matching rule adds a point to strengthPoints
Determines strength: Weak → Medium → Strong → Very Strong

Hooks Used & Why
Hook	        Purpose
useState	    Manages form inputs, options, password, and strength
useCallback	    Caches the passwordGenerator() to prevent unnecessary re-renders
useEffect	    Automatically generates password on changes to length or options
useRef	        For copying password using select() and clipboard interaction

Is Code Optimized?
✅ Yes, code is modular and follows React best practices.
✅ useCallback prevents useEffect from rerunning unnecessarily.
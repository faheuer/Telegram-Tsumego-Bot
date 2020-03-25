#!/usr/bin/env python

import sys, os, requests

if not os.path.exists("beginner_exercises/"):
  os.makedirs("beginner_exercises/")

firstex=1
lastex=10

sys.stdout.write("fetching beginner exercises "+str(firstex)+" to "+str(lastex)+":\n")

for i in range(firstex,lastex+1):
  gethtml=requests.get("http://senseis.xmp.net/?BeginnerExercise"+str(i))
  html=gethtml.read()
  gethtml.close()

  startdiag=html.find("diag1")
  enddiag=html.find("</form>",startdiag)
  diag=html[startdiag:enddiag]

  diagurlstart=diag.find("diagrams/")
  diagurlend=diag.find("\">",diagurlstart)
  diagurl=diag[diagurlstart:diagurlend]

  getsgf=requests.get("http://senseis.xmp.net/"+diagurl)
  sgf=getsgf.read()
  getsgf.close()

  sgffile=open("beginner_exercises/prob_%(#)04d.sgf"%{"#":i},"w")
  sgffile.write(sgf)
  sgffile.close()

  sys.stdout.write(str(i)+" ")
  sys.stdout.flush()

sys.stdout.write("done.\n")

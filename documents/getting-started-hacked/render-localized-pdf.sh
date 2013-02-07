for file in po/*po;
do
	lang=`echo $file | sed 's/po\/\(.*\)\.po/\1/gi'`
	echo $lang
	mkdir -p ./out/$lang
	xml2po -a -p $file src/gettingstarted.svg > out/$lang/gettingstarted.svg
	xml2po -a -p $file src/cheatsheet-01.svg > out/$lang/cheatsheet-01.svg
	xml2po -a -p $file src/cheatsheet-02.svg > out/$lang/cheatsheet-02.svg
	xml2po -a -p $file src/cheatsheet-03.svg > out/$lang/cheatsheet-03.svg
	#create eps
	inkscape -z -A out/$lang/gettingstarted.pdf out/$lang/gettingstarted.svg
	inkscape -z -A out/$lang/cheatsheet-01.pdf out/$lang/cheatsheet-01.svg
	inkscape -z -A out/$lang/cheatsheet-02.pdf out/$lang/cheatsheet-02.svg
	inkscape -z -A out/$lang/cheatsheet-03.pdf out/$lang/cheatsheet-03.svg
	pdfunite out/$lang/cheatsheet-*pdf out/$lang/cheatcheet.pdf
	#remove crap
	rm ./out/$lang/*svg
	rm ./out/$lang/cheatsheet-*
done


for file in po/*po;
do
	lang=`echo $file | sed 's/po\/\(.*\)\.po/\1/gi'`
	echo $lang
	mkdir -p ./out/$lang
	xml2po -a -p $file src/landing.svg > out/$lang/landing.svg
	xml2po -a -p $file src/goa.svg > out/$lang/goa.svg
	#create eps
	inkscape -z -A out/$lang/gs-landing.pdf out/$lang/landing.svg
	inkscape -z -A out/$lang/gs-goa.pdf out/$lang/goa.svg
	pdfunite out/$lang/gs-*pdf out/$lang/getting-started.pdf
	#remove crap
	rm ./out/$lang/*svg
	rm ./out/$lang/gs-*
done


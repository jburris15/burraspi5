#!/bin/bash

LOGFILE="$HOME/burraspi5/MyViteApp/logs/memory_log.txt"

echo "Timestamp, Total_MB, Used_MB, Free_MB, Usage_Percent" >> $LOGFILE

while true
do
    TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")

    # Get memory info in MB
    read TOTAL USED FREE <<< $(free -m | awk '/Mem:/ {print $2, $3, $4}')

    # Calculate usage %
    USAGE=$(awk "BEGIN {printf \"%.2f\", ($USED/$TOTAL)*100}")

    echo "$TIMESTAMP, $TOTAL, $USED, $FREE, $USAGE%" >> $LOGFILE

    sleep 5
done

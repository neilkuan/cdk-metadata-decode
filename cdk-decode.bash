#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
ENDCOLOR='\033[0m'

analytics="$1"

if [[ -z $1 ]];then
    exit 1
fi
analytics_string=$(echo "$analytics" | cut -d':' -f3 | base64 --decode | gunzip -c )


echo ""
# 使用 cut 和 grep 提取包含 "node.js" 的部分
IFS=',' read -ra array <<< "$analytics_string"

# 在数组中查找包含 "node.js" 的元素
for element in "${array[@]}"; do
    if [[ $element == *"node.js"* ]]; then
        echo -e "NODEJS Version"
        echo -e "${YELLOW}$element${ENDCOLOR}" 
    fi
done

if [[ ! -z $2 ]];then
    echo ""
    echo -e "${RED}print ALL CDK MetaData${ENDCOLOR}"
    echo -e "${GREEN}$analytics_string${ENDCOLOR}"
fi
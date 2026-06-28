#!/bin/bash
# Usage: ./new.sh My New Blog Post Title
# Creates a new blog post in content/post/ with frontmatter prefilled

if [ -z "$1" ]; then
  echo "Usage: $0 <title words...>"
  exit 1
fi

TITLE="$*"
DATE=$(date +%y%m%d)
DATE_FULL=$(date +%Y-%m-%d)

# Convert spaces to underscores and lowercase for the slug
SLUG=$(echo "$TITLE" | tr ' ' '_' | tr '[:upper:]' '[:lower:]')

FILENAME="content/post/${DATE}_${SLUG}.md"

if [ -f "$FILENAME" ]; then
  echo "File already exists: $FILENAME"
  exit 1
fi

cat > "$FILENAME" <<EOF
+++
path = "post/${DATE}_${SLUG}"
title = '${TITLE}'
date = '${DATE_FULL}'
description = ''
[taxonomies]
categories = ['']
tags = []
[extra]
author = 'Gertjan Assies'
image = ''
+++

EOF

echo "Created: $FILENAME"

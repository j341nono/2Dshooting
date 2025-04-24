# ベースイメージ（PHP + Apache）
FROM php:8.1-apache

# ranking.txt保存先を作成
RUN mkdir -p /var/www/html/txt

# アパッチ設定
COPY public/ /var/www/html/

# 書き込み権限
RUN chmod -R 777 /var/www/html/txt
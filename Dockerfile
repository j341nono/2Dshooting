# ベースイメージ（PHP + Apache）
FROM php:8.1-apache

# ranking.txt保存先を作成
RUN mkdir -p /var/www/html/txt

# ファイルを配置
COPY public/ /var/www/html/

# 書き込み権限
RUN chmod -R 777 /var/www/html/txt

# Apacheを起動
CMD ["apache2-foreground"]

# PHP 拡張をインストール（必要に応じて調整）
RUN apt-get update && apt-get install -y \
    libzip-dev zip unzip \
    && docker-php-ext-install zip

# mbstring が必要な場合
RUN apt-get install -y libonig-dev && docker-php-ext-install mbstring

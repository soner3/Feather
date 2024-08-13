build:
	docker-compose up --build

up:
	docker-compose up -d

down:
	docker-compose down

down-v:
	docker-compose down -v

makemigrations:
	docker-compose run --rm server python manage.py makemigrations

migrate:
	docker-compose run --rm server python manage.py migrate

run:
	docker-compose run --rm server python manage.py runserver 0.0.0.0:8000

superuser:
	docker-compose run --rm server python manage.py createsuperuser

collectstatic:
	docker-compose run --rm server python manage.py collectstatic

shell:
	docker-compose run --rm server python manage.py shell
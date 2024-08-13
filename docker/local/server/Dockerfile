FROM python:3.12-slim-bookworm

ARG USERNAME=django
ARG USER_UID=1000
ARG USER_GID=1000

RUN groupadd --gid ${USER_GID} ${USERNAME} \
    && useradd --uid ${USER_UID} --gid ${USER_GID} -m ${USERNAME}

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update && apt-get install --no-install-recommends -y \
  build-essential \
  libpq-dev

WORKDIR /app

COPY ./requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN chown -R ${USERNAME}:${USERNAME} /app

USER ${USERNAME}

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]

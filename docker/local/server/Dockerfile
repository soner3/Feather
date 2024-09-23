# Build Stage
FROM python:3.12-slim-bookworm AS builder

ARG USERNAME=django
ARG USER_UID=1000
ARG USER_GID=1000

# Erstellen des Benutzers
RUN groupadd --gid ${USER_GID} ${USERNAME} \
    && useradd --uid ${USER_UID} --gid ${USER_GID} -m ${USERNAME}

# Umgebungsvariablen setzen
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Abhängigkeiten installieren
RUN apt-get update && apt-get install --no-install-recommends -y \
    build-essential \
    libpq-dev

WORKDIR /app

# Kopiere die requirements-Datei und installiere Abhängigkeiten
COPY ./requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Final Stage
FROM python:3.12-slim-bookworm

# Argumente für den Benutzer definieren
ARG USERNAME=django
ARG USER_UID=1000
ARG USER_GID=1000

# Erstellen des Benutzers im finalen Image
RUN groupadd --gid ${USER_GID} ${USERNAME} \
    && useradd --uid ${USER_UID} --gid ${USER_GID} -m ${USERNAME}

# Umgebungsvariablen setzen
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Arbeitsverzeichnis setzen
WORKDIR /app

# Abhängigkeiten vom Builder-Image kopieren
COPY --from=builder /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin

# Kopiere den Rest der Anwendung
COPY . .

# Setze die Besitzrechte
RUN chown -R ${USERNAME}:${USERNAME} /app

USER ${USERNAME}

# Starte die Anwendung
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

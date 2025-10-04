# JobsDB Scraper

Original author: [krishgalani](https://github.com/krishgalani/jobsdb-scraper)

A lightweight, production-oriented scraper for JobsDB job listings. It collects job IDs from search pages and fetches job details via JobsDB's backend APIs. The project is designed to be efficient and run on commodity hardware.

## Installation

Requirements:

- [Node.js 18+](https://nodejs.org/en/download/)

Quick setup:

1. Clone the repository

```shell
git clone https://github.com/vincentwun/jobsdb-scraper.git
cd jobsdb-scraper
```

2. Install dependencies and build

```shell
npm install
npm run build
```

## How to use

Find available pages for a region (hk or th):

```shell
node build/src/scrape_jobsdb maxPages <region>
```

Run the scraper:

```shell
node build/src/scrape_jobsdb -r <hk|th> [-n <numPages>] [-s <saveDir>]
```

Example:

```shell
node build/src/scrape_jobsdb -r hk -n 10
```

Options:

- `-r, --region` (required) two-letter region code: `hk` or `th`
- `-n, --numPages` number of pages to scrape (default: all)
- `-s, --saveDir` directory to save results (default: `./jobsdb_scrape_results`)

## Warning

This operation is not thread-safe. Do not run multiple instances against the same save directory concurrently.

## How it works

The scraper uses the [Ulixee](https://nodejs.org/en/download/) stack. A small number of local cloud nodes host browser environments. Workers pop pages from a shared queue, parse job IDs from HTML responses, then fetch job details via backend GraphQL endpoints. Results are streamed and written to a local JSON file.

## Planned changes

- [ ] Add filter support for job attributes (location, salary, keywords)
- [ ] Containerize the application (Docker)

## Credit

Original author: [krishgalani](https://github.com/krishgalani)

## License

MIT — see `LICENSE`
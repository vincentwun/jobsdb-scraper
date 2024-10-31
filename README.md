<img src="assets/jobsdb.png" width="300" height="auto"><br>
# JobsDB Scraper

A few cool highlights about this scraper:

- **Lightweight,and made to run on commodity computers** - Low memory/cpu utilization due to efficient use of modern web-scraping framework (https://github.com/ulixee/hero).
- **Avoids detection along the entire stack** - High guarantees on ability to safely scrape jobs and bypass Cloudflare.
- **Customize how many pages you want to scrape** - You can specify how many pages of jobs you want to scrape up to a maximum of 1000. 

## Installation

### Requirements:

- **Node.js** version **18** or higher. If not installed, [go here](https://nodejs.org/en/download/) to download it.
- **git** required. If not installed, [go here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) to download it.
### Steps:
1. clone the repo
```shell script
git clone https://github.com/krishgalani/jobsdb-scraper.git
```
2. cd into the repo
```shell script
cd jobsdb-scraper
```
3. install dependencies
```shell script
npm install 
```
4. compile typescript
```shell script
npm run build
```

## Usage
### Warning: This operation is **NOT** thread-safe.

```shell script
node build/src/scrape_jobsdb <firstNPages>
```

`1 <= firstNPages <= 1000`

The results file will save to the current directory in a folder called `jobsdb_scrape_results` by default. 

If you want to specify the directory to save your results file to, you can do:

```shell script
node build/src/scrape_jobsdb <firstNPages> <saveDir>
```

## How it works

There are 1000 pages of publically accessible job information on JobsDB ranging from

[[hk.jobsdb.com/jobs?page=1](hk.jobsdb.com/jobs?page=1) - [hk.jobsdb.com/jobs?page=1000](hk.jobsdb.com/jobs?page=1)]

The server part of the program launches two @ulixee/cloud locally hosted server nodes as the engines behind page navigation and fetches, both hosting a browser with many browsing sessions.

The client program uses the ulixee framework (github.com/ulixee), where each worker (a @ulixee/hero instance connected to a respective @ulixee/cloud server node) has a browser environment and goes page by page on its page range chunk making GETS and POST fetches to the backend db. All workers have a shared page task queue. For each page, first the jobIds are parsed from the returned HTML, then for each jobId a fetch to the backend graphql API is initiated. The results are received in real time and written to a JSON file locally.

## License

[MIT](LICENSE)
import { InvalidArgumentError } from 'commander';
import * as fs from 'fs';
import { findLastPage } from './scrape_utils';
import Hero from '@ulixee/hero'
export function parseRegion(region : string){
  const regions = new Set(['hk','th'])
  if(!regions.has(region)){
    throw new InvalidArgumentError('Region must be hk (hong kong) or th (thailand)')  
  }
  return region
}
export function parseSaveDir(dirPath : string){
  // Ensure the directory exists
  if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
    throw new InvalidArgumentError("The directory specified to save results file to is invalid, try specifying the absolute path")
  } else {
    try {
      fs.accessSync(dirPath, fs.constants.W_OK)
    } catch(err){
      throw new InvalidArgumentError('Directory path to results folder does not have write permissions')
    }
  }
  return dirPath
}
export function parseFormat(fmt : string){
  const formats = new Set(['csv','json'])
  if(!formats.has(fmt)){
    throw new InvalidArgumentError('File format must be csv or json')  
  }
  return fmt
}
export async function parseNumPages(numPages : string, region : string, heroes? : Hero[]) {
  // parseInt takes a string and a radix
  const maxPages = await findLastPage(region)
  if(numPages == "all"){
    return maxPages
  }
  const parsedValue = parseInt(numPages);
  if (isNaN(parsedValue)) {
    throw new InvalidArgumentError('Not a number.');
  } else if (parsedValue < 1){
    throw new InvalidArgumentError('numPages>=1')
  } else {
    if(maxPages < parsedValue){
      throw new InvalidArgumentError(`numPages <= ${maxPages}`)
    }
    return parsedValue;
  }
}
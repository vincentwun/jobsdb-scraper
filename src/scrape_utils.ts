import {compile} from 'html-to-text'
import HeroCore from '@ulixee/hero-core';
import { TransportBridge } from '@ulixee/net';
import { ConnectionToHeroCore } from '@ulixee/hero';
import Hero from '@ulixee/hero';
export const parseHtml = compile({}); // options passed here
export function get_page_url(page: number, region : string): string {
    return `https://${region}.jobsdb.com/jobs?page=${page}`;
}
export function get_base_url(region : string): string {
    return `https://${region}.jobsdb.com/jobs`;
}
export async function isZeroResults(hero: Hero, page: number, region: string){
    const {activeTab, document} = hero
    await activeTab.goto(get_page_url(page,region))
    const elem = document.querySelector('script[data-automation="server-state"]')
    const scriptElement = await activeTab.waitForElement(elem,{timeoutMs: 20000})

    if(scriptElement === null){
        throw new Error("Cannot parse script tag when finding isZeroResults")
    }
    const scriptText = await scriptElement.textContent
    if(scriptText === null){
        throw new Error("Cannot parse script tag when finding isZeroResults")
    }
    const match = scriptText.match(/window\.SEEK_REDUX_DATA\s*=\s*(\{.*?\});/s);
    if (!match) {
        throw new Error('Could not find window.SEEK_REDUX_DATA in the script content.');
    }
    const reduxJsonString = match[1];
    let reduxData;
    try {
      reduxData = JSON.parse(reduxJsonString);
    } catch (err : any) {
      throw new Error(`Failed to parse Redux data: ${err.message}`);
    }
    const isZeroResults = reduxData?.results?.results.jobs === null
    return isZeroResults
}
async function positionFromLastPage(heroes : Hero[] , page : number, region : string) {
    let tasks = []
    for(let i = 0; i < 2;i++){
        tasks.push(isZeroResults(heroes[i],page+i,region))
    }
    let results = await Promise.all(tasks)
    for (let result of results){
        if (result === undefined) {
            throw new Error("Couldn't parse zero result section")
        }
    }
    let currentPageHasNoResults = results[0]
    let currentPageHasResults = !currentPageHasNoResults
    let pageAfterHasNoResults = results[1]
    if(currentPageHasResults && pageAfterHasNoResults){
       return 'on'
    } 
    if(currentPageHasNoResults){
        return 'after'
    }
    return 'before'
}
//Perform a binary search
export async function findLastPage(region : string, heroes? : Hero[]){
    if(region == 'hk'){
        return 1000
    }
    return 500
}
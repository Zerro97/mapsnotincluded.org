import poParser from "npm:gettext-parser";

/**
 * Parses text strings from po file
 * 
 * @param filePath 
 * @returns parsed po object
 */
export async function parsePo(filePath: string) {
  try {
    const poFile = await Deno.readTextFile(filePath)
    const content = poParser.po.parse(poFile)
    return content;
  } catch(error) {
    throw error
  }
}

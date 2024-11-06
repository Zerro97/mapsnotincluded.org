/**
 * Parses mongoDB export file
 * 
 * @param filePath 
 * @returns parsed json object
 */
export async function parseJson(filePath: string) {
  try {
    const jsonText = await Deno.readTextFile(filePath);
    return JSON.parse(jsonText);
  } catch(error) {
    throw error
  }
}

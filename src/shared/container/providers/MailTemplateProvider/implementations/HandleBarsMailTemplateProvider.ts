import handlebars from 'handlebars';
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO'
import IMailTemplateProvider from '../models/IMailTemplateProvider'

export default class HandlebarsMailTemplateProvider implements IMailTemplateProvider{
  public async parse(data: IParseMailTemplateDTO) : Promise<string>{
    const parseTemplate = handlebars.compile(data.template);

    return parseTemplate(data.variables)
  }
}

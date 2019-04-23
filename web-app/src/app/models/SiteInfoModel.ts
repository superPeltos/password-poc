export class SiteInfoModel
{
    guid: string;
    siteUid: string;

    site: string;
    url: string;

    password: string;

    constructor(obj: any = null)
    {
        if(obj != null)
        {
            Object.assign(this, obj);
        }
    }
}

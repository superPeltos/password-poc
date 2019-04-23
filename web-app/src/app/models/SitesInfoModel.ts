

export class SitesInfoModel
{
    sites:[];

    constructor(obj: any = null)
    {
        if(obj != null)
        {
            Object.assign(this, obj);
        }
    }
}


const CustomerSite = require("../models/model.site");
let Validator = require('fastest-validator');

let sites = {};
let counter = 0;

/* create an instance of the validator */
let siteValidator = new Validator();

/* use the same patterns as on the client to validate the request */
let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;

/* site validator shema */
const siteVSchema = {
    guid: {type: "string", min: 3},

    site: { type: "string", min: 1, max: 50},
    url: { type: "string", min: 1, max: 50},
    password: { type: "string", min: 2, max: 50}
};

/* static site service class */
class SiteService
{
    static create(data)
    {
        var vres = siteValidator.validate(data, siteVSchema);

        /* validation failed */
        if(!(vres === true))
        {
            let errors = {}, item;

            for(const index in vres)
            {
                item = vres[index];

                errors[item.field] = item.message;
            }

            throw {
                name: "ValidationError",
                message: errors
            };
        }
        console.log('EXPRESS DATA',data);
        let site = new CustomerSite(data.site, data.url, data.password);
        console.log('EXPRESS CUSTOMER',site);
        site.uid = 's' + counter++;

        sites[site.uid] = site;
        console.log('EXPRESS POST SAVE',sites);
        return site;
    }

    static retrieve(uid)
    {
        console.log(sites)
        if(sites[uid] != null)
        {
            return sites[uid];
        }
        else
        {
            throw new Error('Unable to retrieve a sites by (uid:'+ uid +')');
        }
    }

    static retrieveAll()
    {
        console.log(sites);
        if(sites)
        {
            return sites;
        }
        else
        {
            throw new Error('Unable to retrieve sites');
        }
    }

    static update(uid, data)
    {
        if(sites[uid] != null)
        {
            const customer = sites[uid];

            Object.assign(customer, data);
        }
        else
        {
            throw new Error('Unable to retrieve a customer by (uid:'+ cuid +')');
        }
    }

    static delete(uid)
    {
        if(sites[uid] != null)
        {
            delete sites[uid];
        }
        else
        {
            throw new Error('Unable to retrieve a customer by (uid:'+ cuid +')');
        }
    }
}

module.exports = SiteService;

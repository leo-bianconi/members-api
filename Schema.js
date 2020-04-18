const schema = [
    {
        method: 'GET',
        url: 'api/members',
        description: 'Retrieves all members'
    },
    {
        method: 'GET',
        url: 'api/members/<id>',
        description: 'Retrieves member with a specific id (note that it is a UUID-v4)'
    },
    {
        method: 'POST',
        url: 'api/members',
        description: `Creates a new member. Data can be passed both in request body or headers (in this last case add Content-Type: application-json). You must specify a "name" field and an "email" field. Values must be strings. Retrieves the member you've just created`
    },
    {
        method: 'PUT',
        url: 'api/members/<id>',
        description: "Updates name and/or email of the member whose id is specified. You must specify a name and/or an email. The fields that you don't specify are left untouched. Retrieves the member you've just created"
    },
    {
        method: 'DELETE',
        url: 'api/members/<id>',
        description: 'Deletes member with a specific id. Retrieves a success message if the user is deleted successfully.'
    }
]

module.exports = schema
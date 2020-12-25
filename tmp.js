class Tracker {
    allocate = name => {
        console.log('A ' + name)
        this._checkAvailability(name)

        this.stack[name] += 1
        let result = `${name}${this.stack[name]}`
        return result
    }

    deallocate = name => {
        return this.stack
    }

    _checkAvailability = name => {
        if (!this.stack[name]) this.stack[name] = 0
    }

    stack = {}
}

function hostAllocation(queries) {
    var tracker = new Tracker()
    var results = []
    queries.forEach(function (query) {
        var [action, name] = query.split(' ')
        if (action === 'A') {
            results.push(tracker.allocate(name))
        } else if (action === 'D') {
            tracker.deallocate(name)
        }
    })
    return results
}

console.log(hostAllocation(['A apibox', 'A apibox', 'D apibox1', 'A apibox', 'A sitebox']))
/* 
["apibox1", 
 "apibox2", 
 "apibox1", 
 "sitebox1"]
*/

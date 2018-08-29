/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export function getClosureSafeProperty(objWithPropertyToExtract, target) {
    for (let key in objWithPropertyToExtract) {
        if (objWithPropertyToExtract[key] === target) {
            return key;
        }
    }
    throw Error('Could not find renamed property on target object.');
}
/**
 * Sets properties on a target object from a source object, but only if
 * the property doesn't already exist on the target object.
 * @param target The target to set properties on
 * @param source The source of the property keys and values to set
 */
export function fillProperties(target, source) {
    for (const key in source) {
        if (source.hasOwnProperty(key) && !target.hasOwnProperty(key)) {
            target[key] = source[key];
        }
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy91dGlsL3Byb3BlcnR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE1BQU0sVUFBVSxzQkFBc0IsQ0FBSSx3QkFBMkIsRUFBRSxNQUFXO0lBQ2hGLEtBQUssSUFBSSxHQUFHLElBQUksd0JBQXdCLEVBQUU7UUFDeEMsSUFBSSx3QkFBd0IsQ0FBQyxHQUFHLENBQUMsS0FBSyxNQUFNLEVBQUU7WUFDNUMsT0FBTyxHQUFHLENBQUM7U0FDWjtLQUNGO0lBQ0QsTUFBTSxLQUFLLENBQUMsbURBQW1ELENBQUMsQ0FBQztBQUNuRSxDQUFDO0FBRUQ7Ozs7O0dBS0c7QUFDSCxNQUFNLFVBQVUsY0FBYyxDQUFDLE1BQStCLEVBQUUsTUFBK0I7SUFDN0YsS0FBSyxNQUFNLEdBQUcsSUFBSSxNQUFNLEVBQUU7UUFDeEIsSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUM3RCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzNCO0tBQ0Y7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2xvc3VyZVNhZmVQcm9wZXJ0eTxUPihvYmpXaXRoUHJvcGVydHlUb0V4dHJhY3Q6IFQsIHRhcmdldDogYW55KTogc3RyaW5nIHtcbiAgZm9yIChsZXQga2V5IGluIG9ialdpdGhQcm9wZXJ0eVRvRXh0cmFjdCkge1xuICAgIGlmIChvYmpXaXRoUHJvcGVydHlUb0V4dHJhY3Rba2V5XSA9PT0gdGFyZ2V0KSB7XG4gICAgICByZXR1cm4ga2V5O1xuICAgIH1cbiAgfVxuICB0aHJvdyBFcnJvcignQ291bGQgbm90IGZpbmQgcmVuYW1lZCBwcm9wZXJ0eSBvbiB0YXJnZXQgb2JqZWN0LicpO1xufVxuXG4vKipcbiAqIFNldHMgcHJvcGVydGllcyBvbiBhIHRhcmdldCBvYmplY3QgZnJvbSBhIHNvdXJjZSBvYmplY3QsIGJ1dCBvbmx5IGlmXG4gKiB0aGUgcHJvcGVydHkgZG9lc24ndCBhbHJlYWR5IGV4aXN0IG9uIHRoZSB0YXJnZXQgb2JqZWN0LlxuICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IHRvIHNldCBwcm9wZXJ0aWVzIG9uXG4gKiBAcGFyYW0gc291cmNlIFRoZSBzb3VyY2Ugb2YgdGhlIHByb3BlcnR5IGtleXMgYW5kIHZhbHVlcyB0byBzZXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbGxQcm9wZXJ0aWVzKHRhcmdldDoge1trZXk6IHN0cmluZ106IHN0cmluZ30sIHNvdXJjZToge1trZXk6IHN0cmluZ106IHN0cmluZ30pIHtcbiAgZm9yIChjb25zdCBrZXkgaW4gc291cmNlKSB7XG4gICAgaWYgKHNvdXJjZS5oYXNPd25Qcm9wZXJ0eShrZXkpICYmICF0YXJnZXQuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
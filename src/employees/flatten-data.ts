import { Employee } from './employee.interface';

function flattenTree<T>(idField: string, parentField: string, childrenField: string): (data: any[]) => T[] {
    function visitChildren(childrenArray: any[], parentId: any): T[] {
        if (!childrenArray) {
            return [];
        }
        let subTree = [];
        for (let item of childrenArray) {
            const employee = { ...item };
            delete employee[childrenField];
            employee[parentField] = parentId;
            let employeeSubTree = [employee, ...visitChildren(item[childrenField], item[idField])];
            subTree = [...employeeSubTree, ...subTree];
        }
        return subTree;
    }

    return function flatten(data: any[]): T[] {
        let result = [];
        result = visitChildren(data, null);
        return result as T[];
    };
}
export const flattenData = flattenTree<Employee>('id', 'managerId', 'reports');
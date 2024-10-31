import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    fetchUsers() {
        return {users: [
            {
                userName: 'Zulkefal',
            },
            {
                userName: 'Zulkefal2',
            },
            {
                userName: 'Zulkefal3',
            },
        ]}
    }
}

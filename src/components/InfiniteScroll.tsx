import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Text, Spinner, Card, CardHeader, Flex, Avatar, Heading, Center } from '@chakra-ui/react';
import { fetchUsers } from '../services/api';

interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

const InfiniteScroll: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [initialLoading, setInitialLoading] = useState<boolean>(true);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const observer = useRef<IntersectionObserver | null>(null);

    const lastUserElementRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage(prevPage => prevPage + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    useEffect(() => {
        const loadUsers = async () => {
            setLoading(true);
            try {
                const newUsers = await fetchUsers(page);
                setUsers(prevUsers => [...prevUsers, ...newUsers]);
                setHasMore(newUsers.length > 0);
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        };

        if (!initialLoading) {
            loadUsers();
        }
    }, [page, initialLoading]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setInitialLoading(false);
        }, 3000); // 3 seconds

        return () => clearTimeout(timer);
    }, []);

    return (
        <Box>
            {initialLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <Spinner size="xl" />
                </Box>
            ) : (
                <>
                    <Center className='header'>
                        <Heading as="h1" size="xl">
                            Users
                        </Heading>
                    </Center>
                    {users.map((user, index) => {
                        if (users.length === index + 1) {
                            return (
                                <Card variant='outline' key={user.id} ref={lastUserElementRef}>
                                    <CardHeader>
                                        <Flex>
                                            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                                <Avatar name={user.first_name} src={user.avatar} />
                                                <Box>
                                                    <Heading size='sm'>{user.first_name} {user.last_name}</Heading>
                                                    <Text>{user.email}</Text>
                                                </Box>
                                            </Flex>
                                        </Flex>
                                    </CardHeader>
                                </Card>
                            );
                        } else {
                            return (
                                <Card variant='outline' key={user.id}>
                                    <CardHeader>
                                        <Flex>
                                            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                                <Avatar name={user.first_name} src={user.avatar} />
                                                <Box>
                                                    <Heading size='sm'>{user.first_name} {user.last_name}</Heading>
                                                    <Text>{user.email}</Text>
                                                </Box>
                                            </Flex>
                                        </Flex>
                                    </CardHeader>
                                </Card>
                            );
                        }
                    })}
                    {loading && <Spinner />}
                    {!hasMore && !loading && <Center className='footer'><Text>No more results found</Text></Center>}
                </>
            )}
        </Box>
    );
};

export default InfiniteScroll;

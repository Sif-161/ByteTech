jest.mock('firebase-admin', () => ({
    firestore: {
        FieldValue: {
            serverTimestamp: jest.fn(() => 'MOCK_TIMESTAMP')
        }
    }
}));
//# sourceMappingURL=setup.js.map
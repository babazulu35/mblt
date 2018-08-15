import { ListEventImage } from './list-event-image';

export interface ListEvent {
    Id: number;
    ParentId: number;
    ChildEventCount: number;
    StartDate: any;
    EndDate: any;
    CmsEventCard: {
        CmsContentId: string;
        EventId: number;
        EventName: string;
        EventDate: string;
        VenueName: string;
        EventCampaign: string;
        EventTimeBased: string;
        EventShortDescription: string;
        ShareText: any;
        ShareUrl: any;
        PeformerName: string; // Intentional typo - Backend has typo -- MT
        AccessCode: string;
        PosterColour: string;
        FriendsAttendingCount: number;
        Images: ListEventImage[],
        Warnings: {
            LongWarnings: string;
            ShortWarnings: string;
        },
        Galleries: {
            Caption: any;
            Images: string;
            VideoId: string;
            VideoPlatform: string;
        }[],
        ExternalLinks: {
            ExternalLink: string;
            ExternalLinkImage: string;
            ExternalLinkTitle: any;
        }[],
        LongDescriptions: {
            ComponentType: string;
            Value: string;
            SortIndex: number;
        }[],
    };
}

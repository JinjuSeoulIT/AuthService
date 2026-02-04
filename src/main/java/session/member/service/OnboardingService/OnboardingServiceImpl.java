package session.member.service.OnboardingService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import session.member.dto.onboarding.OnboardingStatusResponseDTO;
import session.member.mapper.Onboarding.OnboardingMapper;


@Service
@RequiredArgsConstructor
public class OnboardingServiceImpl implements OnboardingService {

    private final OnboardingMapper onboardingMapper;

    @Transactional(readOnly = true)
    @Override
    public OnboardingStatusResponseDTO getStatus(long userId) {
        Long authenticationId = onboardingMapper.selectAuthenticationIdByUserId(userId);


        
        if (authenticationId == null) {
            return new OnboardingStatusResponseDTO(false, null);
        }
        return new OnboardingStatusResponseDTO(true, authenticationId);
    }
}